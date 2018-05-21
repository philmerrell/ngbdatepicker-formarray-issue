import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { sessionDate } from './sessionDates';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  term = sessionDate;
  form: FormGroup;
  sessionCodes: FormArray;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
    this.setForm(this.term);
  }

  createForm() {
    this.form = this.formBuilder.group({
      academicCareer: [''],
      description: [''],
      shortDescription: [''],
      termNumber: [''],
      startDate: [''],
      endDate: [''],
      sessionCodes: this.formBuilder.array([])
    });
  }

  setForm(term) {
    this.form.reset({
      academicCareer: term.academicCareer,
      description: term.description,
      shortDescription: term.shortDescription,
      termNumber: term.termNumber,
      startDate: term.startDate,
      endDate: term.endDate,
      sessionCodes: this.formBuilder.array([])
    });

    for (const session of term.sessionCodes) {
      this.addSessionCode(session);
    }
  }

  addSessionCode(session) {
    this.sessionCodes = this.form.get('sessionCodes') as FormArray;
    this.sessionCodes.push(this.createSessionCode(session));
  }

  createSessionCode(session) {
    return this.formBuilder.group({
      code: [session.code],
      firstEnrollmentDate: [session.firstEnrollmentDate],
      startDate: [session.startDate],
      endDate: [session.endDate],
      description: [session.description],
      loaStartDate: [session.loaStartDate],
      loaEndDate: [session.loaEndDate]
    });
  }

}
