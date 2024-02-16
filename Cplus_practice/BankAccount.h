#ifndef BankAccount_H
#define BankAccount_H

#include <iostream>
#include <string>
using namespace std;

class BankAccount {
    public:
        BankAccount(const string & accNum, double amount);
        void deposit(double amount);
        void withdrawal(double amount);
    private:
    string accountNum;
    double accountBal;
};

#endif
