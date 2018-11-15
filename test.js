import axios from 'axios';

axios
    .post('http://localhost:5000/print', {
        mac: '00:11:62:0D:66:22',
        number: 1,
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
            margin: 0;
            box-sizing: border-box;
            color: #000000;
            font-family: 'Noto Sans TC', 'Noto Sans SC', 'Noto Sans JP', 'Noto Sans KR', sans-serif;
            font-size: 26px;
            background-color: #FFFFFF;
        }

        .line {
            border-bottom: 1px solid #000000;
            margin-top: 10px;
            margin-bottom: 10px;
        }

        .property {
            display: table;
            width: 100%;
            margin-bottom: 10px;
        }

        .property-name {
            display: table-cell;
            width: 40%;
            text-align: left;
            font-weight: bold;
        }

        .property-value {
            display: table-cell;
            width: 60%;
            text-align: left;
        }

        .item {
            display: table;
            width: 100%;
            margin-bottom: 10px;
        }

        .item-count {
            display: table-cell;
            width: 20%;
            text-align: left;
        }

        .item-detail, .item-additional-detail {
            display: table-cell;
            width: 60%;
            text-align: left;
        }

        .item-additional-detail {
            padding-left: 30px;
        }

        .item-price {
            display: table-cell;
            width: 20%;
            text-align: right;
        }

        .summary {
            display: table;
            width: 100%;
        }

        .summary-name {
            display: table-cell;
            width: 80%;
            text-align: right;
        }

        .summary-value {
            display: table-cell;
            width: 20%;
            text-align: right;
        }

    </style>
</head>
<body>
<div class="property">
    <div class="property-name">
        Hotel Name:
    </div>
    <div class="property-value">
        Handy
    </div>
</div>
<div class="property">
    <div class="property-name">
        Room Number:
    </div>
    <div class="property-value">
        Apple
    </div>
</div>
<div class="property">
    <div class="property-name">
        Time:
    </div>
    <div class="property-value">
        11:00
    </div>
</div>

<div class="line"></div>

<div class="item">
    <div class="item-count">
        1
    </div>
    <div class="item-detail">
        にっぽんご/にほんご
    </div>
    <div class="item-price">
        $12
    </div>
</div>

<div class="item">
    <div class="item-count">
        1
    </div>
    <div class="item-detail">
        日本僑民亦有相當多人識講日文
    </div>
    <div class="item-price">
        $12
    </div>
</div>

<div class="item">
    <div class="item-count">
        1
    </div>
    <div class="item-additional-detail">
        - 佢哋嘅
    </div>
    <div class="item-price">
        $12
    </div>
</div>

<div class="line"></div>

<div class="summary">
    <div class="summary-name">
        Total:
    </div>
    <div class="summary-value">
        $112
    </div>
</div>

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
