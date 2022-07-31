import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  // From - selectbox Chennai, Mumbai, Bangalore and Delhi
  // To - selectbox It should contain cities except selected in the From selectbox 
  // Departure date - today and future date can be selected 
  // Return date - It should be higher date than the selected departure date
  // Number of passenger. - Count
  // Submit - Enable only after all fields are valid; Once clicked the button show alert with message “Flight has been searching…”
  flightSearchForm = this.formBuilder.group({
    from: new FormControl(null, [Validators.required]),
    to: new FormControl(null, [Validators.required]),
    departureDate: new FormControl(null, [Validators.required]),
    returnDate: new FormControl(null, [Validators.required]),
    passengerCount: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
  }, { validator: this.dateCheck });

  constructor(private formBuilder: FormBuilder) { }

  cities: string[] = ['Chennai', 'Mumbai', 'Bangalore', 'Delhi'];
  ngOnInit(): void {
    this.flightSearchForm.controls['to'].disable();
    this.flightSearchForm.controls['from'].valueChanges.subscribe(x => {
      if (x !== null && x.length > 0) {
        this.flightSearchForm.controls['to'].enable();
      } else {
        this.flightSearchForm.controls['to'].reset();
        this.flightSearchForm.controls['to'].disable();
      }
    });
  }

  dateCheck(c: AbstractControl): { invalid: boolean } {
    if (new Date(c.get('departureDate').value) >= new Date(c.get('returnDate').value)) {
      return { invalid: true };
    }
  }

  search() {
    console.log(this.flightSearchForm.getRawValue())
    alert("Flight has been searching...");
  }

  getToCities() {
    return this.flightSearchForm.value.from === null ? this.cities : this.cities.filter(x => x != this.flightSearchForm.value.from);
  }

  reset() {
    this.flightSearchForm.reset();
  }

  get isFormValid() {
    return this.flightSearchForm.valid;
  }

  isInvalidForm() {
    var errors: any[] = [];
    for (var key in this.flightSearchForm.controls){
      var control: AbstractControl = this.flightSearchForm.controls[key];
      if (!control.pristine && control.errors) {
        errors.push(key + " - " + Object.keys(control.errors));
      }
    }
    return errors;
  }

}
