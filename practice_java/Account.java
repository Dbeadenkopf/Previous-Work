// this will be the class that has the account name, account number, and the balance of the account
import java.util.*;


public class Account {
    
    private String name;
    private String account_Number;
    private double account_Balance;

    public Account(String N, String aN, double aB){
        this.name = N;
        this.account_Number = aN;
        this.account_Balance = aB;
    }

    public String getName(){
        return name;
    }
    public String getAccNum(){
        return account_Number;
    }
    public double getAccBal(){
        return account_Balance;
    }

    public void setName(String N){
        this.name = N;
    }

    public void setAccNum(String aN){
        this.account_Number = aN;
    }
    public void setAccBal(double aB){
        this.account_Balance = aB;
    }

    public void deposit(double amount){
        account_Balance = account_Balance + amount;
    }

    public void withdraw(double amount){
        account_Balance = account_Balance - amount;
    }

    public String getAccountInformation(){
        return ("Name: " + name + " Account#: " + account_Number + " Balance: " + account_Balance);
    }
    
}
