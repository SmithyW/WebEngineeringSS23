import { Component } from "@angular/core";
import { FormArray, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UserData } from "@shared/custom/types";
import { Subscription } from "rxjs";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { RestService } from "src/app/services/rest/rest.service";

@Component({
	selector: "app-account-details",
	templateUrl: "./account-details.component.html",
	styleUrls: ["./account-details.component.scss"],
})
export class AccountDetailsComponent {
	user: UserData | undefined;
	formData: FormData[] = [];
	nameControl: FormControl = new FormControl();
	emailControl: FormControl = new FormControl();
	phoneControl: FormControl = new FormControl();
	error = false;
	form: FormArray | undefined;
	isNew = false;

	private subscriptions = new Subscription();

	constructor(private rest: RestService, private authService: AuthenticationService) {}

	ngOnInit(): void {
    const userId = this.authService.getUser()?._id;
    if (!userId) {
      throw new Error("User must be logged in!");
    }
		this.subscriptions.add(
			this.rest.fetchUser().subscribe({
				next: (data) => {
          console.log("user response", data);
					this.user = data.data;
          this.initForm();
				},
				error: (err) => {
          console.error("Error while fetching user with id " + userId, err);
					//this.error = true;
          this.user = this.authService.getUser();
          this.initForm();
				},
			})
		);
	}

	private initForm() {
		this.nameControl = new FormControl(this.user?.name, Validators.required);
		this.emailControl = new FormControl(this.user?.email, Validators.required);
		this.phoneControl = new FormControl(this.user?.phone);
		this.form = new FormArray([
			this.nameControl,
			this.emailControl,
			this.phoneControl,
		]);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	update() {
    if (this.user) {
      this.rest.updateUser({
        _id: this.user._id,
        name: this.nameControl.value,
        email: this.emailControl.value,
        phone: this.phoneControl.value
      });
    } else {
      console.error("cannot update user becauce this.user is undefined");
    }
  }
}
