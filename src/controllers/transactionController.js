const userBalanceRepository = require('../repositories/userBalanceRepository');
const transactionRepository = require('../repositories/transactionRepository');
const ServiceRepository = require('../repositories/serviceRepository');
const helper = require('../helpers/responseHelper');
const { v4: uuidv4 } = require('uuid');

  exports.topUp = async (req, res) => {
    try {
      const userId = req.user.id;
      const { top_up_amount } = req.body;

      await userBalanceRepository.updateOrCreateBalance(userId, top_up_amount);

      const invoiceNumber = uuidv4();
      await transactionRepository.createTransaction(userId, invoiceNumber, null, 'Top-Up', null, top_up_amount);

      return helper.success(res, { invoiceNumber }, 'Top-Up successful');
    } catch (error) {
      return helper.error(res, error.message);
    }
  }


  
    exports.getTransactionHistory = async (req, res)  => {
        const userId = req.user.id; 

        try {
            const transactions = await transactionRepository.getTransactionsByUserId(userId);
            res.status(200).json({
                status: 200,
                message: 'Transaction history fetched successfully',
                data: transactions,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 500,
                message: 'Internal server error',
            });
        }

        
    };
    exports.createTransaction = async (req, res) => {
      try {
        const userId = req.user.id; 
        const { serviceCode } = req.body;
    
        
        if (!serviceCode) {
          return helper.error(res, 'ServiceCode is required', 400);
        }
    
        
        const service = await ServiceRepository.getServiceByCode(serviceCode);
        if (!service) {
          return helper.error(res, 'Service not found', 404);
        }
    
        const { service_name, service_tariff } = service; 
    
        
        const balance = await userBalanceRepository.getBalance(userId);
        if (balance < service_tariff) {
          return helper.error(res, 'Insufficient balance', 400);
        }
    
        
        await userBalanceRepository.updateBalance(userId, -service_tariff);
    
        
        const invoiceNumber = uuidv4();
    
        
        await transactionRepository.createTransaction(userId, invoiceNumber, serviceCode, service_name, 'PAYMENT', service_tariff);
    
        
        return helper.success(res, { invoiceNumber }, 'Payment successful');
      } catch (error) {
        console.error(error);
        return helper.error(res, 'Internal server error');
      }
  }

  exports.getTransactions = async (req, res) => {
    try {
      const userId = req.user.id;
      const transactions = await transactionRepository.getUserTransactions(userId);

      return helper.success(res, { transactions }, 'Transactions retrieved successfully');
    } catch (error) {
      return helper.error(res, error.message);
    }
    };


    
    exports.getBalance = async (req, res) => {
        const userId = req.user.id; 

        try {
            const balance = await userBalanceRepository.getBalanceByUserId(userId);
            res.status(200).json({
                status: 200,
                message: 'Balance fetched successfully',
                data: balance,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 500,
                message: 'Internal server error',
            });
        }
    };



