// lets practice printf in java 
// practicing print f to format integers
import java.util.*;
import java.time.LocalTime;
import java.util.ArrayList;

public class Method{
    public static void main(String[] args) {
        // lets create a new instance of the school
        School school = new School();

        // create some new students
        Student student1 = new Student("David Beadenkopf", 12, 17);
        Student student2 = new Student("Robert Zaynk", 10, 14);
        Student student3 = new Student("Mike Clevenger", 11, 16);
        Student student4 = new Student("Robert Clemmens", 9, 14);

        // adding the students to the school
        school.addStudent(student1);
        school.addStudent(student2);
        school.addStudent(student3);
        school.addStudent(student4);

        // creating some teachers
        Teacher teacher1 = new Teacher("Katie Rienheart", "English");
        Teacher teacher2 = new Teacher("Robert Zayn", "Algebra");
        Teacher teacher3= new Teacher("Patrick Bateman", "Physics");

        // add those teachers to the school
        school.addTeacher(teacher1);
        school.addTeacher(teacher2);
        school.addTeacher(teacher3);

        // lets now create new SchoolClass objects with class and Teacher 
        SchoolClass mathClass = new SchoolClass("Mathematics", teacher2);
        // add students to the math class
        mathClass.addStudents(student1);
        mathClass.addStudents(student2);
        mathClass.addStudents(student3);
        mathClass.addStudents(student4);

        SchoolClass scienceClass = new SchoolClass("Physics", teacher3);
        // adding student to the physics class
        scienceClass.addStudents(student1);
        scienceClass.addStudents(student2);
        scienceClass.addStudents(student3);

        SchoolClass englishClass = new SchoolClass("English", teacher1);

        // lets add some students to the class
        englishClass.addStudents(student1);
        englishClass.addStudents(student2);
        englishClass.addStudents(student3);
        englishClass.addStudents(student4);

        // lets add classes to the school
        school.addClass(mathClass);
        school.addClass(scienceClass);
        school.addClass(englishClass);

        // displaying general school information
        System.out.println("School information: ");
        System.out.println("Number of students: " + school.getStudents().size());
        System.out.println("Number of teachers: " + school.getTeachers().size());
        System.out.println("Number of classes: " + school.getClasses().size());

        // printing math class information 
        System.out.println("\nMath Class Information: ");
        System.out.println("Class Name: " + mathClass.getClassName());
        System.out.println("Teacher: " + mathClass.getTeacher().getName());
        System.out.println("Number of Students: " + mathClass.getStudent().size());
        System.out.println();

        // printing scienceclass information 
        System.out.println("\nScience Class Information: ");
        System.out.println("Class Name: " + scienceClass.getClassName());
        System.out.println("Teacher: " + scienceClass.getTeacher().getName());
        System.out.println("Number of Students: " + scienceClass.getStudent().size());
        System.out.println();

        // printing english class information 
        System.out.println("\nEnglish Class Information: ");
        System.out.println("Class Name: " + englishClass.getClassName());
        System.out.println("Teacher: " + englishClass.getTeacher().getName());
        System.out.println("Number of Students: " + englishClass.getStudent().size());
        System.out.println();

        // remove a student, a teacher and a class from the school
        school.removeStudent(student1);
        school.removeTeacher(teacher2);
        school.removeClass(englishClass);

        // printing updated school information after removal
        System.out.println("School information after removing one student, teacher and class: ");
        System.out.println("Numbers of students: " + school.getStudents().size());
        System.out.println("Number of teachers: " + school.getTeachers().size());
        System.out.println("Number of classes: " + school.getClasses().size());
        
    }
}




class School{
    private ArrayList<Student> students;

    private ArrayList<Teacher> teachers;

    private ArrayList<SchoolClass> classes;

    School(){
        students = new ArrayList<Student>();
        teachers = new ArrayList<Teacher>();
        classes = new ArrayList<SchoolClass>();
    }

    // method to add a student to student list
    public void addStudent(Student student){
        students.add(student);
    }

    // method to remove a student from student list
    public void removeStudent(Student student){
        students.remove(student);
    }

    // method to add teacher to teacher list
    public void addTeacher(Teacher teacher){
        teachers.add(teacher);
    }

    public void removeTeacher(Teacher teacher){
        teachers.remove(teacher);
    }

    // method to add school class to class list
    public void addClass(SchoolClass schoolClass){
        classes.add(schoolClass);
    }

    // method to remove school class from class list
    public void removeClass(SchoolClass schoolClass){
        classes.remove(schoolClass);
    }

    // method to return collection of students
    public ArrayList<Student> getStudents(){
        return students;
    }

    public ArrayList<Teacher> getTeachers(){
        return teachers;
    }

    public ArrayList<SchoolClass> getClasses(){
        return classes;
    }

}







class Student{
    private String name;
    private int grade_Level;
    private int age;

    Student(String N, int gL, int A){
        this.name = N;
        this.grade_Level = gL;
        this.age = A;
    }

    public String getName(){
        return name;
    }

    public int getGradeLevel(){
        return grade_Level;
    }

    public int getAge(){
        return age;
    }

    public void setName(String N){
        this.name = N;
    }

    public void setGradeLevel(int gL){
        this.grade_Level = gL;
    }
    public void setAge(int A){
        this.age = A;
    }

}

class Teacher{
    private String t_Name;

    private String subject;


    Teacher(String N, String S){
        this.t_Name = N;
        this.subject = S;
    }

    public String getName(){
        return t_Name;
    }

    public String getSubject(){
        return subject;
    }

    public void setName(String N){
        this.t_Name = N;
    }

    public void setSubject(String S){
        this.subject = S;
    }

}

class SchoolClass {
    // variable to hold name of class
    private String className;

    // private field to store teacher of class
    private Teacher teacher;
    // private field to store a list of student objects
    private ArrayList<Student> students;

    // the constructor to initilize our class 
    SchoolClass(String cN, Teacher T){
        this.className = cN;
        this.teacher = T;

        students = new ArrayList<Student>();
    }

    public String getClassName(){
        return className;
    }

    public Teacher getTeacher(){
        return teacher;
    }

    public ArrayList<Student> getStudent(){
        return students;
    }

    public void setClassName(String cN){
        this.className = cN;
    }

    public void setTeacher(Teacher T){
        this.teacher = T;
    }

    public void addStudents(Student student){
        students.add(student);
    }

    public void removeStudent(Student student){
        students.remove(student);
    }


}