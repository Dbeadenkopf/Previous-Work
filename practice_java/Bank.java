import java.util.*;
import java.util.ArrayList;

public class Bank {
    // making a collection to hold the accounts into the bank
    private ArrayList<Account> accounts;
    
    public Bank(){
        accounts = new ArrayList<Account>();
    }

    // bank class method to add accoount 
    public void addAccount(Account account){
        accounts.add(account);
    }

    // bank class method to remove account 
    public void removeAccount(Account account){
        accounts.remove(account);
    }

    public void accountDeposit(Account account, double amount){
        account.deposit(amount);
    }

    public void accountWithdraw(Account account, double amount){
        account.withdraw(amount);
    }

    // bank class method to return collection of accounts
    public ArrayList<Account> getAccounts(){
        return accounts;
    }

    
}
