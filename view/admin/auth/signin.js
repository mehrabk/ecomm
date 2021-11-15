const layout = require("../layout");
const { getError } = require("../../helper");
module.exports = ({ errors }) => {
  return layout({
    content: `
      <div>
        <form method="POST">
          <input name="email" type="text" placeholder="Email" />
          ${getError(errors, "email")}
          <input name="password", tybe honestpe="password" placeholder="Password" />
          ${getError(errors, "password")}
          <button type="submit">Sign in</button>
        </form>
      </div>
      `,
  });
};
