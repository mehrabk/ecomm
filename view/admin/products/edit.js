const layout = require("../layout");

module.exports = ({ product }) => {
  return layout({
    content: `
    <form method="POST">
      <input name="title" type="text" value="${product.title}" />
      <input name="price" type="text" value="${product.price}" />
      <input name="image" type="file" />
      <button type="submit">Submit</button> 
    </form>
  `,
  });
};
