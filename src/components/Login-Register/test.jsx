createUser(email, password)
      .then((result) => {
        const user = result.user;
        const newUser ={name,email};
        // Save new user into data base
        fetch('http://localhost:5000/users',{
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(newUser)
        })
        .then(res=> res.json())
        .then(data =>{
          console.log("user created in DB",data);
        })
       } )
        
