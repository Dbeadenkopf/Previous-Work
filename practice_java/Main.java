// this file will house the main file this will run both 
// bank and account file

import java.util.ArrayList;


public class Main {
    public static void main(String[] args) {
        // lets create a new bank
        Bank bank = new Bank();

        // lets create at least three accounts 
        Account account1 = new Account("Brittanie Marcum", "115666533", 1500);
        Account account2 = new Account("David Beadenkopf", "9854891119", 10006);
        Account account3 = new Account("Regina Beadenkopf", "988898889", 3000);

        // adding the three accounts to the bank
        bank.addAccount(account1);
        bank.addAccount(account2);
        bank.addAccount(account3);

        // retrieve the list of accounts from the bank
        ArrayList<Account> accounts = bank.getAccounts();

        // iterate through the accounts in the bank
        for(Account account: accounts){
            System.out.println(account.displayInformation());
        }

        // depositing 1000 in account 1
        bank.accountDeposit(account1, 1000);
        // displaying the account information 
        System.out.println("\nDepositing 1000 in account1 ");
        System.out.println(account1.displayInformation());

        // depositing 200 in account 2
        System.out.println("\nDepositing 200 in account 2");
        bank.accountDeposit(account2, 200);
        // displaying that information 
        
        System.out.println(account2.displayInformation());

        // withdrawing 2000 from account 3
        
        bank.accountWithdraw(account3, 2000);

        // displaying that information 
        System.out.println("\nWithdraw 2000 from account3");
        System.out.println(account3.displayInformation());
    }
}
