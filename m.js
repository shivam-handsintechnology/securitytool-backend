fetch("http://localhost:8000/api/get_line_of_business_list")
    .then(response => {
        console.log(response.status)
    });
console.log("End ")