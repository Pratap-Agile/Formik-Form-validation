import React from "react";
import { Formik, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Spinner } from "primereact/spinner";
import { InputMask } from "primereact/inputmask";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Growl } from "primereact/growl";
import { ProgressSpinner } from "primereact/progressspinner";
class ReactForm extends React.Component {
  constructor() {
    super();
    this.showError = this.showError.bind(this);
  }

  showError() {
    this.growl.show({
      severity: "error",
      summary: "Error Message",
      detail: "Validation failed",
    });
  }
  render() {
    //Yup schema
    const SignupSchema = Yup.object().shape({
      fname: Yup.string()
        .required("First Name is Required")
        .matches(/^[a-zA-Z]+$/, "Number and special character is not  allowed")
        .min(3, "Miminum 3 charagter needed")
        .max(50, "Maximum 50 charagter needed"),
      lname: Yup.string()
        .required("Last Name is Required")
        .matches(/^[a-zA-Z]+$/, "Number and special character is not  allowed")
        .min(3, "Miminum 3 charagter needed")
        .max(50, "Maximum 50 charagter needed"),
      email: Yup.string().email("Invalid email").required("Email is Required"),
      gender: Yup.string().required("Gender is Required"),
      rating: Yup.number().moreThan(0, "Rating is Required"),
      age: Yup.number()
        .typeError("age must be a number")
        .min(10, "Age should not be less than 10")
        .max(20, "Age should be more than 20"),
      password: Yup.string()
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )
        .required("Password is required"),
      phone: Yup.string().required("99-9999-9999 format is Required"),
      cities: Yup.array().required("City is Required"),
      language: Yup.string().required("At least one Language"),
      slide: Yup.number().moreThan(0, "Range is Required"),
      country: Yup.string().required("Country is Required"),
      comment: Yup.string().required("Comment is Required"),
      dob: Yup.string().required("DOB is Required"),
      multiValue: Yup.array().min(2, "At least two value is required"),
    });

    //Values for dropdown
    const languageSelectItems = [
      { label: "Javascript", value: "JS" },
      { label: "PHP", value: "PHP" },
      { label: "Java", value: "JAVA" },
    ];
    //Values for city
    const cityList = ["London", "Paris", "Ottawa"];

    return (
      <>
        <Growl ref={(el) => (this.growl = el)} />
        <Formik
          initialValues={{
            fname: "",
            email: "",
            gender: "",
            age: 0,
            phone: "",
            cities: [],
            language: "",
            dob: "",
            multiValue: [],
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions, isValid) => {
            setTimeout(() => {
              console.log(values);
              actions.setSubmitting(false);
              actions.resetForm();
            }, 1000);
          }}
          //Render part of Formik form
          render={({
            handleChange,
            values,
            setFieldValue,
            isValid,
            isSubmitting,
          }) => (
            <Form>
              <div className="form-group">
                <label className="font-weight-bold mb-0">First Name</label>
                <InputText
                  autoComplete="off"
                  placeholder="First Name"
                  name="fname"
                  value={values.fname}
                  className="form-control"
                  onChange={handleChange}
                />
                <ErrorMessage name="fname">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-group">
                <label className="font-weight-bold mb-0">Email</label>
                <InputText
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  className="form-control"
                  onChange={handleChange}
                />
                <ErrorMessage name="email">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-group">
                <label className="font-weight-bold mb-0">Gender</label>
                <div className="p-col-12">
                  <RadioButton
                    inputId="rb1"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                    checked={values.gender === "Male"}
                  />
                  <label htmlFor="rb1" className="p-radiobutton-label">
                    Male
                  </label>
                  <RadioButton
                    inputId="rb2"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                    checked={values.gender === "Female"}
                  />
                  <label htmlFor="rb1" className="p-radiobutton-label">
                    Female
                  </label>
                </div>
                <ErrorMessage name="gender">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-group">
                <label className="font-weight-bold mb-0">Age</label>
                <Spinner
                  className="p-fluid w-100"
                  name="age"
                  value={values.age}
                  min={0}
                  max={100}
                  onChange={handleChange}
                />
                <ErrorMessage name="age">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-group">
                <label className="font-weight-bold mb-0">Phone Number</label>
                <InputMask
                  className="w-100"
                  name="phone"
                  mask="99-9999-9999"
                  placeholder="99-9999-9999"
                  value={values.phone}
                  onChange={handleChange}
                ></InputMask>
                <ErrorMessage name="phone">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-group">
                {/* For array */}
                <FieldArray
                  name="cities"
                  render={(arrayHelpers) => (
                    <div>
                      {cityList.map((city, index) => (
                        <div className="p-col-12" key={index}>
                          <Checkbox
                            onChange={(e) => {
                              if (e.checked) {
                                arrayHelpers.push(e.value);
                              } else {
                                const idx = values.cities.indexOf(e.value);
                                arrayHelpers.remove(idx);
                              }
                            }}
                            value={city}
                            checked={values.cities.includes(city)}
                          ></Checkbox>
                          <label htmlFor="cb1" className="p-checkbox-label">
                            {city}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                />
                <ErrorMessage name="cities">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-group">
                <label className="font-weight-bold mb-0">DOB</label>
                <Calendar
                  readOnlyInput={true}
                  className="w-100 p-fluid"
                  placeholder="99/99/9999"
                  name="dob"
                  value={values.dob}
                  onChange={handleChange}
                  monthNavigator={true}
                  yearNavigator={true}
                  yearRange="2010:2030"
                />
                <ErrorMessage name="dob">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-group">
                <label className="font-weight-bold mb-0">Select Language</label>
                <Dropdown
                  className="w-100"
                  name="language"
                  value={values.language}
                  options={languageSelectItems}
                  onChange={handleChange}
                  placeholder="Select a Language"
                />
                <ErrorMessage name="language">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>
              <button
                className="btn btn-primary"
                disabled={isSubmitting}
                type="submit"
              >
                {" "}
                Submit
              </button>
              {isSubmitting === true && (
                <ProgressSpinner
                  style={{ width: "30px", height: "30px" }}
                  fill="#fff"
                />
              )}
              <h3>{isValid ? "Form is valid" : "Form is not valid"}</h3>{" "}
            </Form>
          )}
        />
      </>
    );
  }
}
export default ReactForm;
