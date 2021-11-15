module.exports = ({ content }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <script>window.bio = {name: "mehrab kor"}</script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
      </head>
      <title>Welcome</title>
      <body>
      ${content}
      </body>
    </html>
  `;
};
