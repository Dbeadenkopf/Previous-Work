#include "BankAccount.h"


BankAccount::BankAccount(const string & accNum, double amount){
    accountNum = accNum;
    accountBal = amount;
}

void BankAccount::deposit(double amount){
    accountBal += amount;
    cout << "Succesfully Deposited Amount: " << accountBal << endl;
}

void BankAccount::withdrawal(double amount){
    if (amount <= accountBal){
        accountBal = accountBal - amount;
        cout << "WithDrawal Succesfull: " << accountBal << endl;
    }else{
        cout << "Cannot withdrawal Insifficient Funs" << endl;
    }
}




int main(){
    string accountID = "1300BD";
    double withdrawalAmount, Current_Balanace, Deposit_Amount;
    Current_Balanace  = 1500;
    cout << "Current Balance of the Account: " << Current_Balanace << endl;
    BankAccount  myAccount(accountID, Current_Balanace);
    Deposit_Amount = 1500;
    myAccount.deposit(Deposit_Amount);

    withdrawalAmount = 750;
    myAccount.withdrawal(withdrawalAmount);


    return 0;
}