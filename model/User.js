let connection;
class User {
    constructor(firstname, lastname, email, phone) {
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.phone = phone;
    }
    static setConnection(conn)
    {
        connection = conn;
    }
    save() {
        const query = 'INSERT INTO users (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)';
        const values = [this.firstname, this.lastname, this.email, this.phone];
    
        return new Promise((resolve, reject) => {
          connection.query(query, values, (error, results) => {
            if (error) {
              return reject(error);
            }
            resolve(results);
          });
        });
      }
    
}
module.exports = User;