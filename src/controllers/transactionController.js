const userBalanceRepository = require('../repositories/userBalanceRepository');
const transactionRepository = require('../repositories/transactionRepository');
const ServiceRepository = require('../repositories/serviceRepository');
const helper = require('../helpers/responseHelper');
const { v4: uuidv4 } = require('uuid');

  exports.topUp = async (req, res) => {
    try {
      const userId = req.user.id;
      const { top_up_amount } = req.body;
      if (top_up_amount < 0 || isNaN(Number(top_up_amount)) ) {
      return helper.error(res, 'Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0');
      }
      
      await userBalanceRepository.updateOrCreateBalance(userId, top_up_amount);

      const invoiceNumber = uuidv4();
      await transactionRepository.createTransaction(userId, invoiceNumber, null, 'Top-Up', null, top_up_amount);

      const balance = await userBalanceRepository.getBalanceByUserId(userId);
      return helper.success(res, balance, 'Top Up Balance berhasil');
    } catch (error) {
      return helper.error(res, 'Internal server error');
    }
  }


  
    exports.getTransactionHistory = async (req, res)  => {
        const userId = req.user.id; 

        try {
            const transactions = await transactionRepository.getTransactionsByUserId(userId);
            return helper.success(res, transactions, 'Get History Berhasil');
        } catch (error) {
            return helper.error(res, 'Internal server error');

        }

        
    };
    exports.createTransaction = async (req, res) => {
      try {
        const userId = req.user.id; 
        const { serviceCode } = req.body;
    
        
        if (!serviceCode) {
          return helper.error(res, 'Masukkan service_code terlebih dahulu', 400);
        }
    
        
        const service = await ServiceRepository.getServiceByCode(serviceCode);
        if (!service) {
          return helper.error(res, 'Service atau Layanan tidak ditemukan', 400);
        }
    
        const { service_name, service_tariff } = service; 
    
        
        const balance = await userBalanceRepository.getBalance(userId);
        if (balance < service_tariff) {
          return helper.error(res, 'Uang habis bang, topup dulu', 400);
        }
    
        
        await userBalanceRepository.updateBalance(userId, -service_tariff);
    
        
        const invoiceNumber = uuidv4();
    
        
        const data = await transactionRepository.createTransaction(userId, invoiceNumber, serviceCode, service_name, 'PAYMENT', service_tariff);
        
        delete data.user_id
        return helper.success(res, data, 'Transaksi Berhasil');
      } catch (error) {
        return helper.error(res, 'Internal server error');
      }
  }

    
  exports.getBalance = async (req, res) => {
      const userId = req.user.id; 

      try {
          const balance = await userBalanceRepository.getBalanceByUserId(userId);
          return helper.success(res, balance, 'Get balance berhasil');

      } catch (error) {
          return helper.error(res, 'Internal server error');

      }
  };



