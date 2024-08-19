import java.util.ArrayList;

public class Inventory {
    private String product_Name;
    private String product_Type;
    private String product_Number;
    private ArrayList<String> inventory = new ArrayList<String>();

    public Inventory(String pN, String pT, String pN){
        this.product_Name = pN;
        this.product_Type = pT;
        this.product_Number = pN;
    }

    public String getProdName(){
        return product_Name;
    }

    public String getProdType(){
        return product_Type;
    }

    public String getProdNum(){
        return product_Number;
    }

    public ArrayList<String> getInventory(){
        return inventory;
    }

    public boolean checkInventory(){
        return (inventory.size() == 0 ? true : false);
    }

    public void inventoryStatus(){
        if(checkInventory() == true){
            System.out.println("The inventory is low or theres nothing in it");
        }else{
            System.out.println("The inventory has items in it or is full");
        }
    }

}
