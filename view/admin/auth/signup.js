const layout = require("../layout");
const { getError } = require("../../helper");

module.exports = ({ req, errors }) => {
  return layout({
    content: `
      <div>
      Your id is : ${req.session.userId}
        <form method="POST">
          <input name="email" type="text" placeholder="Email" class="form-control m-4 w-50"  />
          ${getError(errors, "email")}
          <input name="password", tybe honestpe="password" placeholder="Password" class="form-control m-4 w-50"/>
          ${getError(errors, "password")}
          <input name="passwordConfirm" type="password" placeholder="Password Confirmation" class="form-control m-4 w-50"/>
          ${getError(errors, "passwordConfirm")}
          <button type="submit" class="m-3">Signup</button>
        </form>
      </div>
    `,
  });
};
