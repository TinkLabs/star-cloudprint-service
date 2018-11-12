import axios from 'axios';

axios
    .post('http://localhost:5000/print', {
        mac: '00:11:62:0D:66:22',
        html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <style>
        @import url(https://fonts.googleapis.com/earlyaccess/notosanstc.css);
        @import url(https://fonts.googleapis.com/earlyaccess/notosanssc.css);
        @import url(https://fonts.googleapis.com/earlyaccess/notosansjp.css);
        @import url(https://fonts.googleapis.com/earlyaccess/notosanskr.css);
        body {
            width: 576px;
            padding: 10px;
            margin: 0;
            box-sizing: border-box;
            color: #000000;
            font-family: 'Noto Sans TC', 'Noto Sans SC', 'Noto Sans JP', 'Noto Sans KR', sans-serif;
            font-size: 28px;
            font-weight: 600;
            background-color: #FFFFFF;
        }

        .center {
            text-align: center;
        }
        .left {
            text-align: left;
        }
        .right {
            text-align: right;
        }
    </style>
</head>
<body>
<p class="center">Handy</p>
<p class="right">Apple</p>
<p class="right">Banner</p>
<p class="right">にっぽんご/にほんご</p>
<p class="right">日本僑民亦有相當多人識講日文</p>
<p class="right">佢哋嘅</p>
</body>
</html>        
        `,
    })
    .then(({data}) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    });
