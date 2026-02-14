import { useState } from "react";

 const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
   
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,//spread operator to copy the existing user object
      [name]: value,//as we dont know which input field is being updated we use the name attribute to update the corresponding value in the user object
    });
  };

  // handle form on submit
  const handleSubmit = (e) => {
    e.preventDefault();

  };

  

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/register.png"
                  alt="a nurse with a cute look"
                  width="500"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">registration form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="username"
                      id = "username"
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                      id = "email"
                        required
                        autoComplete="off"
                
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                        id = "password"
                        required
                        autoComplete="off"
                    />
                  </div>

                  <div>
                    <label htmlFor="phoneNumber">phone number</label>
                    <input
                      type="number"
                      name="phoneNumber"
                      value={user.phoneNumber}
                      onChange={handleInput}
                      id = "phoneNumber"
                        required
                        autoComplete="off"
                    />
                  </div>
                  
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Register;