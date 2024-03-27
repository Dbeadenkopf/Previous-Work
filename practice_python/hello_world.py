
def decode(message_file):
    with open(message_file, "r") as f:
        lines = f.readlines()

    # make empty list to store message
    message_words = []

    # stor a null length placeholder in each list element
    for x in range(100):
        message_words.append('')


    #loop through the lines 
    for line in lines:
        #split the line by space and get the first element as the number
        number = int(line.split()[0])

        # determine if the number equates to the last element value of a "pyramid" line
        for x in range(100):
            if number == (int((x * x + x)/ 2)):
                message_words[x] = line.split()[1]
                break


    #Now, concatenate the non-null list values together to form a sentence
    text = ""

    for x in message_words:
        if x != '':
            text = text + x + " "
    return text



def main():

    myFile = "coding_input.txt"
    decoding_message = decode(myFile)
    print(decoding_message)


main()
