// app.js
const express = require('express');
const app = express();
app.use(express.json());

app.post('/bfhl', (req, res) => {
  const data = req.body.data || [];
  const userId = "Arasavelli Sai Sankar_28032005"; // lowercase, ddmmyyyy = DOB
  const email = "saishankararasavelli28@gmail.com";
  const rollNumber = "22BCE9070";

  let odd = [], even = [], alpha = [], special = [];
  let sum = 0;
  let alphaStr = [];

  data.forEach(item => {
    let str = String(item);
    if (/^\d+$/.test(str)) {
      if (parseInt(str) % 2 === 0) even.push(str);
      else odd.push(str);
      sum += parseInt(str);
    } else if (/^[a-zA-Z]+$/.test(str)) {
      alpha.push(str.toUpperCase());
      alphaStr.push(str);
    } else {
      special.push(str);
    }
  });

  // concatenate alpha chars, alternating caps, reverse order
  let concat = alphaStr.join('').split('').reverse()
    .map((c, i) => i % 2 === 0 ? c.toUpperCase() : c.toLowerCase())
    .join('');

  res.json({
    is_success: true,
    user_id: userId,
    email: email,
    roll_number: rollNumber,
    odd_numbers: odd,
    even_numbers: even,
    alphabets: alpha,
    special_characters: special,
    sum: sum.toString(),
    concat_string: concat
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port', PORT));
