const express = require('express');
const app = express();

app.use(express.json());

// Your details
const FULL_NAME = "arasavelli_sai_sankar"; // must be lowercase with underscores
const DOB = "28032005"; // ddmmyyyy format
const EMAIL = "saishankararasavelli28@gmail.com";
const ROLL_NUMBER = "222BCE9070";

app.get("/", (req, res) => {
  res.send("✅ Fullstack API is running. Use POST /bfhl");
});

app.post('/bfhl', (req, res) => {
  const data = req.body.data || [];

  let odd = [], even = [], alpha = [], special = [];
  let sum = 0;
  let alphaChars = [];

  data.forEach(item => {
    let str = String(item);

    // Numbers
    if (/^\d+$/.test(str)) {
      let num = parseInt(str);
      if (num % 2 === 0) even.push(str);
      else odd.push(str);
      sum += num;

    // Alphabets
    } else if (/^[a-zA-Z]+$/.test(str)) {
      alpha.push(str.toUpperCase());
      alphaChars.push(...str.split("")); // break into individual letters

    // Special Characters
    } else {
      special.push(str);
    }
  });

  // Concatenate alphabets → reverse → alternating caps
  let concat = alphaChars.reverse()
    .map((c, i) => (i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()))
    .join('');

  res.json({
    is_success: true,
    user_id: `${FULL_NAME}_${DOB}`,
    email: EMAIL,
    roll_number: ROLL_NUMBER,
    odd_numbers: odd,
    even_numbers: even,
    alphabets: alpha,
    special_characters: special,
    sum: sum.toString(),
    concat_string: concat
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
