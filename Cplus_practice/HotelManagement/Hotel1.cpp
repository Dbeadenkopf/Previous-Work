// THis program will simulate a hotel management system 
// we will be using the Linked List data structure 
#include <iostream>
#include <cstring>

using namespace std;
class Hotel{

    private:
        // create our node to house our data 
        struct Node{
            int id, date;
            string name, roomtype;

            // pointer to the next node
            Node* next;
        };


    public:
        // setting pointer equal to null to indicate the end of the list
        Node* head = NULL;
        void insert();
        void menu();
        void update();
        void search();
        void del();
        void sort();
        void show();
};


// this function will show and display the User interface of the hotel management syste,
// or the hud if you will
void Hotel::menu(){

    int choice;
    cout << "\n";
    cout << "\tWelcome To Hotel Management System " << endl;
    cout << "\n\t_____Hotel Management System_______" << endl;
    cout << "\n]nS.No    Functions         Description" << endl;
    cout << "\n1\tAllocate Room\t\t\tInsert New Room";
    cout << "\n2\tSearch Room\t\t\tSearch Room with RoomID";
    cout << "\n3\tUpdate Room\t\t\tUpdate Room record";
    cout << "\n4\tDelete Room\t\t\tDelete Room with RoomID";
    cout << "\n5\tShow Room Records\t\t\tShow Room Records that (wr Added)";
    cout << "\n6\tExit" << endl;

    cout << "Enter Your Choice" << endl;
    cin >> choice;
    switch(choice){
        case 1:
            insert();
            menu();
        break;
        case 2:
            search();
            menu();
        break;
        case 3:
            update();
            menu();
        break;
        case 4:
            del();
            menu();
        break;
        case 5:
            sort();
            show();
            menu();
        break;
        case 6:
            exit(0);
            default:
                cout << "Invalid";

    }



    
}

// lets insert data into our linked list
void Hotel::insert(){
    cout << "\n\t_____Hotel Management System_____";
    Node *new_Node = new Node;
    cout << "\nEnter Room ID " << endl;
    cin >> new_Node->id;
    cout << "\nEnter Customer Name" << endl;
    cin >> new_Node->name;
    cout << "\nEnter New Date " << endl;
    cin >> new_Node->date;
    cout << "\nEnter RoomType (single/double/twin) " << endl;
    cin >> new_Node->roomtype;

    // once we have our data we can insert it into the linkedList
    if(head == NULL){
        head = new_Node;
    }else{
        Node* ptr = head;
        while(ptr->next != NULL){
            ptr = ptr->next;
        }
        ptr->next = new_Node;
    }
    cout << "\n\n\t\t new Room Inserted";
}

// now lets make the function that searchs 
 void Hotel::search(){
    cout << "\n\t_____Hotel Management System_____";
    int t_id;
    
    if(head == NULL){
       cout << "\n\nLinked list is Empty";
    }else{
        cout <<"\n\nRoom ID";
        cin >> t_id;
        Node* ptr = head;
        while(ptr!= NULL){
           if(t_id == ptr->id){
                cout << "\n\nRoom ID" << ptr->id;
                cout << "\n\nCustomer Name" << ptr->name; 
                cout << "\n\nNew Room Date" << ptr->date;
                cout << "\n\nRoom Type" << ptr->roomtype;
           }
           ptr = ptr->next;
        }
        }

 }

 void Hotel::update(){
    cout << "\n\t_____Hotel Management System_____";
    int t_id;
    
    if(head == NULL){
       cout << "\n\nLinked list is Empty";
    } else{
        cout << "\n\nRoom ID";
        cin>>t_id;
        Node *ptr = head;
        while(ptr!= NULL){
            if(t_id == ptr->id){
                cout << "\n\nRoomID";
                cin >> ptr->id;          
                cout << "\n\nCustomer Name";
                cin >> ptr->name;
                cout << "\n\nAllocated Date";
                cin >> ptr->date;
                cout << "\n\nRoomType";
                cin >> ptr->roomtype;

                cout << "\n\n\t\t Update record Successfully";
             }
             ptr = ptr->next; // then make that node of info the next one
        }
    }
 }


 // function to delete information from the node 

void Hotel::del(){
    cout << "\n\t_____Hotel Management System_____";
    int t_id;
    
    if(head == NULL){
       cout << "\n\nLinked list is Empty";
    } else{
        cout << "\n\nRoom ID";
        cin>>t_id;
        if(t_id == head->id){
            Node* ptr = head;
            head = head->next;
            delete ptr; // we go ahead and delete the node
            cout << "Delete Room Record Successfullyt\n";
        }
        else
        {
            Node* pre = head;
            Node* ptr = head;
            while(ptr!=NULL){
                if(t_id == ptr->id){
                    pre->next = ptr->next;
                    delete ptr;
                    cout << "Delete Room Record Successfully\n";
                    break;
                }
                pre = ptr;
                ptr=ptr->next;

            }
        }
        

    }
}


// now we will impliment the show function which shows the information
// regarding room based on the room ID enters
void Hotel::show(){
    Node* ptr= head;
    while(ptr!= NULL){
        cout << "\n\nRoomID" << ptr->id;

        cout << "\n\nCustomer Name" << ptr->name;

        cout << "\n\nAllocated Date" << ptr->date;

        cout << "\n\nRoomType " << ptr->roomtype;
        ptr = ptr->next;
    }
}

// now we will impliment the sort function to sort the linked list
// of data
void Hotel::sort(){
     if(head == NULL){
       cout << "\n\nLinked list is Empty";
       menu();
    } 
    int count = 0;
    int t_date,t_id;
    string t_name, t_roomtype;
    Node* ptr = head;
    while (ptr!= NULL){
        count++;
        ptr = ptr->next;
    }
    for(int i = 1; i <=count;i++){
        Node *ptr = head;
        for(int j = 1; j < count; j++){
            if (ptr->id > ptr->next->id){
                t_id = ptr->id;
                t_name = ptr->name; 
                t_date = ptr->date;
                t_roomtype = ptr->roomtype;
                // Save Date Into Current Node
                ptr->id = ptr->next->id;
                ptr->name = ptr->next->name;
                ptr->date = ptr->next->date;
                ptr->roomtype = ptr->next->roomtype;
                // Save data into next Node
                ptr->next->id = t_id;
                ptr->next->name = t_name;
                ptr->next->date = t_date;
                ptr->next->roomtype = t_roomtype;
             }
          //  ptr = ptr->next;
         }
    }

}




// now lets call and test out linked list 
int main(){

    Hotel h;
    h.menu();

    return 0;
}