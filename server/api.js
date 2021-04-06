const sqlite3 = require('sqlite3').verbose();
// var args = { filePath : "reponses.db", outputPath : "SPRING2021.csv" };


var create = (req, res) => {
  let db = new sqlite3.Database('responses.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    // - Session ID
    // - Group ID
    // - Q1 answer
    // - Q1 timestamp
    // - Q2 answer
    // - Q2 timestamp
    db.run("CREATE TABLE Responses(SessionID int, GroupID varchar(1), Q1 int, Q2 int);");
  });
}

var read = async (req, res) => {
  return new Promise((resolve, reject) => {
    var responses = [];
    let db = new sqlite3.Database('responses.db', sqlite3.OPEN_READONLY, (err) => {
      if (err) {
        console.error(err.message);
      }
      db.serialize(() => {
        db.each("SELECT * FROM Responses", (err, row) => {
          if (err) {
            console.error(err.message);
          }
          responses.push({groupID: row.GroupID, q1: row.Q1, q2: row.Q2});
        });
      })
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        resolve(responses);
      });
    })
  });
}

var addResponse = (sessionID, groupID, q1, q2) => {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database('responses.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
      }
      db.run("INSERT INTO Responses VALUES("+sessionID+", '"+groupID+"', "+q1+", "+q2+")")
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        resolve();
      });
    });
  });
}

var getScores = (id, lab) => {
  return new Promise((resolve, reject) => {
    scores = [];
    let db = new sqlite3.Database('SPRING2021.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
      }
      // db.run("UPDATE Scores SET " + lab + " = 100 WHERE GTID = " + id + ";");
      db.serialize(() => {
        db.each("SELECT * FROM Scores", (err, row) => {
          if (err) {
            console.error(err.message);
          }
          scores.push(row); // iterate over columns?
        });
      })
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        resolve(scores);
      });
    });
  });
}

getCSV = () => {
  return new Promise((resolve, reject) => {
    sqliteToCsv.toCSV(args, (err) => { });
  });
}

module.exports = {
  create: create,
  read: read,
  addResponse: addResponse,
  getScores: getScores,
  getCSV: getCSV,
};

// create();
