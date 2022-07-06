const axios = require('axios')
require('dotenv').config()
require('colors')



const guest = async() => {


    try{

        console.log('\n-----------------GuestPro--------------------------\n'.green)

        const instance = axios.create({

            baseURL: 'https://admin.guestpro.com/apiv2',
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',

            },
            params: {
                'resource':'invoices',
                'task':'get',
                'data':{},
                'access_token':process.env.ACCESSTOKEN,
                'access_token_secret':process.env.ACCESSTOKENSECRET,
                   
            }
        })
        const resp = await instance.post()
        console.log('Respuesta GuestPro', resp.data)


        console.log('\n-----------------Holded--------------------------\n'.red)
        //Asignamos la data deseada de la respuesta para luego enviarla a la API de holded 

        // let invoice = {
        //     payment_id: resp.data.payment_id,
        //     date: resp.data.date,
        //     amount:resp.data.total_amount,
        //     reference_code:resp.data.booking_id,
        //     auth_code:resp.data.token,
        //     notes:resp.data.notes,
        //     bankId:'ES123456',
        //     contactId:resp.data.customer.contact_id,
            
        // }

        //Dummy data
        let invoice = {
            payment_id:'123456',
            date: 20181210,
            method:3,
            amount:900,
            description:'pago final',
            reference_code:'',
            auth_code:'',
            notes:'',
            bankId:'es123456',
            contactId:'902potato'
            
        }

        console.log('Dummy data de invoice',invoice)
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











