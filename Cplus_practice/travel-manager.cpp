//This file contains the scource code for a travel-mangement system. 
// THis system will allow users to book, cancel, look up and 
// output the reciepts

#include <iostream>
#include <fstream>
#include <iomanip>

using namespace std;

class Customers {


    public:
        string name, gender, address;
        int age, mobileNo, cusID;

        void detDetails(){

            // we need to store this information into a file so
            // doing file io here 
            ofstream out("old-customers.txt", ios::app);
            {
                cout << "Enter Customer ID: ";
                cin >> cusID;
                cout << "Enter Customer Name: ";
                cin >> name;
                cout << "Enter Customer Age: ";
                cin >> age;
                cout << "Enter Mobile Number: ";
                cin >> mobileNo;
                cout << "Enter Address: ";
                cin >> address;
                cout << "Enter Gender: ";
                cin >> gender;
            }

            out << "\nCustomer ID: " << cusID << "\nName: " << name << "\nAge: " << age << "\nMobile Number: " << mobileNo << "\nAddress: " << address << "\nGender: " << gender << endl;
            out.close();
            cout << "\nSAVED \nNOTE: We save your details record for furture purpose\n" << endl;
        }

        void showDetails()
        {
            ifstream in("old-customers.txt");
            {
                if(!in){
                    cout << "File Error!" << endl;
                }
            }
            
        }



};


class Cabs {


};

class Booking{

};


class Charges{

};



int main(){



    return 0;
}