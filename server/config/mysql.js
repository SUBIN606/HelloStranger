const mysql = require('mysql');

module.exports = function () {
    return {
        init: function () {
            return mysql.createConnection( {
                host: 'localhost',
                user: 'root',
                password: 'mysql606',
                database: 'mydb',
                multipleStatements: true,  // 다중쿼리용 설정
                dateStrings: 'date' // 날짜컬럼 설정
            })
        },

        conn_test: function (connection) {
            connection.connect(function (err){
                if (err) console.error("mysql connection error : " + err);
                // else console.info("mysql connect success");
            })
        },
        conn_test: function (connection, msg) {
            connection.connect(function (err){
                if (err) console.error("mysql connection error : " + err);
                // else console.info("mysql connect success : " + msg);
            })
        }
    }
}