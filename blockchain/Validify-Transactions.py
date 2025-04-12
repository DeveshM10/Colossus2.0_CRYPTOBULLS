import hashlib
import pandas as pd

class User:
    def __init__(self, username, balance=100):
        self.username = username
        self.user_hash = self.generate_hash()
        self.balance = balance

    def generate_hash(self):
        return hashlib.sha256(self.username.encode()).hexdigest()

class Block:
    def __init__(self, block_id, sender, receiver, amount, previous_hash, nonce, total_hash, additional_token, verification_hash):
        self.block_id = block_id
        self.sender = sender
        self.receiver = receiver
        self.amount = amount
        self.previous_hash = previous_hash
        self.nonce = nonce
        self.total_hash = total_hash
        self.additional_token = additional_token
        self.verification_hash = verification_hash

    def calculate_hash(self):
        block_contents = str(self.block_id) + self.sender + self.receiver + str(self.amount) + self.previous_hash + str(self.nonce)
        return hashlib.sha256(block_contents.encode()).hexdigest()

    def calculate_verification_hash(self):
        return hashlib.sha256((self.total_hash + self.additional_token).encode()).hexdigest()

    def mine_block(self, difficulty):
        while self.total_hash[:difficulty] != '0' * difficulty:
            self.nonce += 1
            self.total_hash = self.calculate_hash()

    def validate_block(self):
        return self.total_hash == self.calculate_hash() and self.verification_hash == self.calculate_verification_hash()

    def __str__(self):
        return f"BlockID: {self.block_id}\nSender: {self.sender}\nReceiver: {self.receiver}\nAmount: {self.amount}\nPrevious Hash: {self.previous_hash}\nNonce: {self.nonce}\nTotal Hash: {self.total_hash}\nVerification Hash: {self.verification_hash}"

class Blockchain:
    def __init__(self):
        self.chain = []
        self.difficulty = 4
        self.current_block_id = 1
        self.users = {}
        self.load_from_excel()

    def create_users(self):
        for i in range(2):
            username = input(f"Enter username for {i+1} user: ")
            self.users[username] = User(username)
        print("Created users")

    def add_transaction(self, sender, receiver, amount):
        if sender not in self.users or receiver not in self.users:
            print("make sure the users ecist")
            return
        if self.users[sender].balance < amount:
            print("insufficient balance")
            return

        previous_hash = "0" if not self.chain else self.chain[-1].total_hash
        new_block = Block(self.current_block_id, sender, receiver, amount, previous_hash, 0, '', '', '')
        new_block.mine_block(self.difficulty)
        new_block.additional_token = input("Enter password for transaction: ")
        new_block.verification_hash = new_block.calculate_verification_hash()

        if not new_block.validate_block():
            print("Block data invalid so the transaction is cancelled")
            return

        self.users[sender].balance -= amount
        self.users[receiver].balance += amount
        self.chain.append(new_block)
        self.current_block_id += 1
        print(f"Transaction complete \nVerification Hash for the new block: {new_block.verification_hash}")

    def validate_block(self, verification_hash):
        for block in self.chain:
            if block.verification_hash == verification_hash:
                if not block.validate_block():
                    print(f"Block {block.block_id} is invalid.")
                    return None
                return block
        return None
    
    def show_transactions_for_user(self, username):
        found = False
        for block in self.chain:
            if block.sender == username or block.receiver == username:
                found = True
                print(block)
        if not found:
            print(f"No transactions found for user: {username}")

    def save_to_excel(self):
        data = {'BlockID': [], 'Sender': [], 'Receiver': [], 'Amount': [], 'Previous Hash': [], 'Nonce': [],
                'Total Hash': [], 'Additional Token': [], 'Verification Hash': []}
        for block in self.chain:
            data['BlockID'].append(block.block_id)
            data['Sender'].append(block.sender)
            data['Receiver'].append(block.receiver)
            data['Amount'].append(block.amount)
            data['Previous Hash'].append(block.previous_hash)
            data['Nonce'].append(block.nonce)
            data['Total Hash'].append(block.total_hash)
            data['Additional Token'].append(block.additional_token)
            data['Verification Hash'].append(block.verification_hash)
        pd.DataFrame(data).to_excel('blockchain_data.xlsx', index=False)

        user_data = {'Username': [], 'User Hash': [], 'Balance': []}
        for user in self.users.values():
            user_data['Username'].append(user.username)
            user_data['User Hash'].append(user.user_hash)
            user_data['Balance'].append(user.balance)
        pd.DataFrame(user_data).to_excel('user_data.xlsx', index=False)

    def load_from_excel(self):
        try:
            # Load blockchain data
            df = pd.read_excel('blockchain_data.xlsx')
            for _, row in df.iterrows():
                block = Block(
                    int(row['BlockID']),
                    str(row['Sender']) if pd.notna(row['Sender']) else '',
                    str(row['Receiver']) if pd.notna(row['Receiver']) else '',
                    float(row['Amount']),
                    str(row['Previous Hash']) if pd.notna(row['Previous Hash']) else '',
                    int(row['Nonce']),
                    str(row['Total Hash']) if pd.notna(row['Total Hash']) else '',
                    str(row['Additional Token']) if pd.notna(row['Additional Token']) else '',
                    str(row['Verification Hash']) if pd.notna(row['Verification Hash']) else ''
                )
                if not block.validate_block():
                    print(f"Block {block.block_id} is invalid")
                    return
                self.chain.append(block)
                self.current_block_id += 1

            # Load user data
            user_df = pd.read_excel('user_data.xlsx')
            for _, row in user_df.iterrows():
                username = str(row['Username'])
                balance = float(row['Balance'])
                user = User(username, balance=balance)
                user.user_hash = str(row['User Hash']) 
                self.users[username] = user

        except FileNotFoundError:
            print("Excel files not found, starting fresh.")

def blockchain_menu():
    blockchain = Blockchain()

    while True:
        print("\nMenu:")
        print("1. Create 2 Users")
        print("2. Make Transactions ")
        print("3. Verify Transaction")
        print("4. Show Balances")
        print("5. Exit")
        print("6. Show Transactions for a User")  
        choice = input("Enter your choice: ")

        if choice == '1':
            blockchain.create_users()
            blockchain.save_to_excel()

        elif choice == '2':
            sender = input("Enter sender username: ")
            receiver = input("Enter receiver username: ")
            try:
                amount = float(input("Enter amount to transfer: "))
                blockchain.add_transaction(sender, receiver, amount)
                blockchain.save_to_excel()
            except ValueError:
                print("Invalid amount entered.")

        elif choice == '3':
            verification_hash = input("Enter Verification Hash: ")
            block = blockchain.validate_block(verification_hash)
            if block:
                print("Block is valid,  Details:")
                print(block)
            else:
                print("Block invalid.")

        elif choice == '4':
            for user in blockchain.users.values():
                print(f"{user.username} | Balance: {user.balance} | Hash: {user.user_hash}")

        elif choice == '5':
            print("Exiting...")
            break

        elif choice == '6':  
            username = input("Enter the username to view transactions: ")
            blockchain.show_transactions_for_user(username)

        else:
            print("Invalid choice. Try again.")


if __name__ == "__main__":
    blockchain_menu()