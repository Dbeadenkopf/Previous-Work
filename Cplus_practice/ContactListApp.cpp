// This is the main file that will hold our main and where we begin to access our linked list
#include "ContactList.h"

using namespace std;





int main(){
    // lets create our first one
    ContactList* client1 = new ContactList();


    // lets set up a looping structure now to add a name
    string name;
    while(true){
        cout << "Enter the name of the Contact or q to quit." << endl;
        cin >> name;
        if(name == "q"){
            break; // end loop now that user has entered q
        }else{
            // go ahead and add to the linked list
            client1->addToHead(name);
        }
    }
    
    client1->printList();
    return 0;
}