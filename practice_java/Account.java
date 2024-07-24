import java.util.*;

public class Account {
    // name of the account holder
    private String name;
    // the account number 
    private String accountNumber;
    // the account balance 
    private double balance;

    public Account(String n, String aN, double B){
        this.name = n;
        this.accountNumber = aN;
        this.balance = B;
    }

    public String getName(){
        return name;
    }

    public String getAccNum(){
        return accountNumber;
    }

    public double getBal(){
        return balance;
    }

    public void setName(String N){
        this.name = N;
    }

    public void setAccNum(String aN){
        this.accountNumber = aN;
    }

    public void setAccBal(double B){
        this.balance = B;
    }

    // account class method to deposit money
    public void deposit(double amount){
        balance = balance+amount;
    }

    // account class method to withdraw money
    public void withdraw(double amount){
        balance = balance - amount;
    }

    // account class method to display information
    public String displayInformation(){
        return ("Name: " + name + ", Account Number: " + accountNumber + " , Balance: " + balance);
    }
    
}
