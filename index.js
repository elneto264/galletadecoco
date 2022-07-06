const axios = require('axios')
require('dotenv').config()
require('colors')



const guest = async() => {


    try{

        console.log('\n-----------------GuestPro--------------------------\n'.green)

        const instance = axios({

            baseURL: 'https://admin.guestpro.com/apiv2',
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',

            },
            data: {
                'resource':'invoice',
                'task':'get',
                'data':{id:213624},
                'access_token':process.env.ACCESSTOKEN,
                'access_token_secret':process.env.ACCESSTOKENSECRET,
                   
            }
        })
        const resp = await instance
        console.log('Respuesta GuestPro', resp.data.data)
        Object.keys(resp.data.data.payments).forEach(keys =>{
            //console.log(resp.data.data.payments[keys].id)
            pay_id = resp.data.data.payments[keys].id
        })

        console.log('payment_id', pay_id)


        console.log('\n-----------------Holded--------------------------\n'.red)
        //Asignamos la data deseada de la respuesta para luego enviarla a la API de holded 

        let invoice = {
            payment_id: pay_id,
            date: resp.data.data.date,
            amount:resp.data.data.total_amount,
            reference_code:resp.data.data.booking_id,
            auth_code:resp.data.data.token,
            notes:resp.data.data.notes,
            bankId:'ES123456',
            contactId:resp.data.data.customer.contact_id,
            
        }

        console.log('Data de invoice', invoice)
        //Payment GET nos debe devolver un array vacio ya que en la cuenta no hay pagos
        const options_get = {
            method: 'GET',
            url: 'https://api.holded.com/api/invoicing/v1/payments',
            headers: {Accept: 'application/json', key: process.env.HOLDEDKEY}
        };
          
        axios.request(options_get).then(function (response) {
            console.log('Lista de pagos Holded',response.data);
        }).catch(function (error) {
            console.error(error);
        });


        //Payment POST nos debe devolver en la data 
        //un objeto con status, info y id
        const options_post = {
            method: 'POST',
            url: 'https://api.holded.com/api/invoicing/v1/payments',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              key: process.env.HOLDEDKEY
            },
            data: {
                bankId: this.bankId, 
                contactId: this.contactId, 
                amount: this.amount, 
                desc: this.description, 
                date: this.date
            }
          };

          axios.request(options_post).then(function (response) {
            console.log('En Holded',response.data);
          }).catch(function (error) {
            console.error(error);
          });



    } catch(error){
        console.log(error)

    }





}


guest()







