const SignUp2 = (props) => {
    if (props.currentStep !== 1) {
        return null
    }
    // The markup for the Step 1 UI
    return(
    <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
        className="form-control"
        id="email"
        name="email"
        type="text"
        placeholder="Enter email"
        value={props.email} // Prop: The email input data
        onChange={props.handleChange} // Prop: Puts data into state
        />
    </div>
    );
}

export default SignUp2;