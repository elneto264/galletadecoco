const axios = require('axios')
require('dotenv').config()
require('colors')



const guest = async() => {


    try{

        console.log('\n-----------------GuestPro--------------------------\n'.green)

        const instance = axios.create({
            //baseURL: `https://admin.guestpro.com/apiv2?resource=invoice&task=get`,
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
        //status con 1 que se creo, en info Created y por ultimo el id correspondiente
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







