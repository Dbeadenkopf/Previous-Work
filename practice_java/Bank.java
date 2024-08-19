import java.util.ArrayList;

public class Bank {
    private ArrayList<Account> accounts;
    public Bank(){
        accounts = new ArrayList<Account>();
    }

    public void addAccount(Account account){
        accounts.add(account);
    }

    public void removeAccount(Account account){
        accounts.remove(account);
    }

    public void bankDeposit(Account account, double amount){
        account.deposit(amount);
    }

    public void bankWithdraw(Account account, double amount){
        account.withdraw(amount);
    }

    // the method to return the collection of those accounts
    public ArrayList<Account> getAccounts(){
        return accounts;
    }
    
}
