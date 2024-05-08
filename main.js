const sensitive = [
    {
      key: '_persist',
      value: {
        isEmail: false,
        isJwt: false,
        isObjectId: false,
        isPassportNumber: false,
        isBase64: false,
        isCreditCard: false,
        isHashedPassword: false,
        isPhoneNumber: false
      }
    },
    {
      key: 'persist:root',
      value: {
        isEmail: true,
        isJwt: true,
        isObjectId: false,
        isPassportNumber: false,
        isBase64: false,
        isCreditCard: false,
        isHashedPassword: false,
        isPhoneNumber: false
      }
    }
  ];
  
  let filtersensitivedata = sensitive.map((item) => {
    let arr = [];
    Object.keys(item.value).forEach((v) => {
      console.log("V", item.value[v]);
      if (item.value[v] === true) {
        arr.push(v);
      }
    });
    return {
      key: item.key,
      values: arr
    };
  });
  
  filtersensitivedata = filtersensitivedata.filter(item => item.values.length > 0?true:false);
  console.log("Sensitive Data", filtersensitivedata.filter(item => item));
  
    