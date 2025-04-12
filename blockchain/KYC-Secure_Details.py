import hashlib
import pandas as pd
import base64
import os
import json

class Block:
    def __init__(self, block_id, tokens, previous_hash, nonce, total_hash, additional_token, verification_hash):
        self.block_id = block_id
        self.tokens = tokens
        self.previous_hash = previous_hash
        self.nonce = nonce
        self.total_hash = total_hash
        self.additional_token = additional_token
        self.verification_hash = verification_hash

    def calculate_hash(self):
        block_contents = str(self.block_id) + json.dumps(self.tokens) + str(self.previous_hash) + str(self.nonce)
        return hashlib.sha256(block_contents.encode()).hexdigest()

    def calculate_verification_hash(self):
        return hashlib.sha256((self.total_hash + self.additional_token).encode()).hexdigest()

    def mine_block(self, difficulty):
        while self.total_hash[:difficulty] != '0' * difficulty:
            self.nonce += 1
            self.total_hash = self.calculate_hash()

    def validate_block(self):
        return self.total_hash == self.calculate_hash() and self.verification_hash == self.calculate_verification_hash()


class Blockchain:
    def __init__(self):
        self.chain = []
        self.difficulty = 4
        self.current_block_id = 1
        self.load_from_excel()

    def load_from_excel(self):
        if not os.path.exists('blockchain_data.xlsx'):
            print("No blockchain file found so im creating new")
            return
        df = pd.read_excel('blockchain_data.xlsx')
        for index, row in df.iterrows():
            try:
                tokens = json.loads(row['Tokens'])
            except json.JSONDecodeError:
                print(f"Block is invalid {row['BlockID']} due to token decoding error")
                continue
            block = Block(
                row['BlockID'],
                tokens,
                row['Previous Hash'],
                row['Nonce'],
                row['Total Hash'],
                row['Additional Token'],
                row['Verification Hash']
            )
            if not block.validate_block():
                print(f"Block is invalid {block.block_id}")
                continue
            self.chain.append(block)
            self.current_block_id += 1

    def add_block(self, tokens, additional_token):
        previous_hash = self.chain[-1].total_hash if self.chain else '0'
        block = Block(self.current_block_id, tokens, previous_hash, 0, '', additional_token, '')
        block.mine_block(self.difficulty)
        block.verification_hash = block.calculate_verification_hash()
        if not block.validate_block():
            print("Block validation has failed so im mining")
            return
        self.chain.append(block)
        self.current_block_id += 1
        self.save_to_excel()
        print(f"\nlock added successfully!")
        print(f"Verification : {block.verification_hash}")

    def save_to_excel(self):
        data = {
            'BlockID': [],
            'Tokens': [],
            'Previous Hash': [],
            'Nonce': [],
            'Total Hash': [],
            'Additional Token': [],
            'Verification Hash': []
        }
        for block in self.chain:
            data['BlockID'].append(block.block_id)
            data['Tokens'].append(json.dumps(block.tokens))
            data['Previous Hash'].append(block.previous_hash)
            data['Nonce'].append(block.nonce)
            data['Total Hash'].append(block.total_hash)
            data['Additional Token'].append(block.additional_token)
            data['Verification Hash'].append(block.verification_hash)
        df = pd.DataFrame(data)
        df.to_excel('blockchain_data.xlsx', index=False)

    def get_kyc_by_username(self, username):
        for block in self.chain:
            if block.tokens.get('full_name', '').lower() == username.lower():
                return block
        return None


def encode_image_to_base64(image_path):
    with open(image_path, 'rb') as img_file:
        return base64.b64encode(img_file.read()).decode('utf-8')


def decode_image_from_base64(base64_str, output_path):
    with open(output_path, 'wb') as out_file:
        out_file.write(base64.b64decode(base64_str.encode('utf-8')))


def input_kyc():
    print("\n Enter KYC Information")
    full_name = input("Full Name: ")
    pan_number = input("PAN Number: ")
    dob = input("Date of Birth (YYYY-MM-DD): ")
    address = input("Address: ")
    image_path = input("Image file path: ")
    additional_token = input("Additional token: ")
    try:
        image_base64 = encode_image_to_base64(image_path)
    except FileNotFoundError:
        print("Image file not found.")
        return None, None

    tokens = {
        "full_name": full_name,
        "pan_number": pan_number,
        "dob": dob,
        "address": address,
        "image_data": image_base64
    }
    return tokens, additional_token


def view_kyc(block):
    print("\n KYC Details")
    print(f"Full Name     : {block.tokens['full_name']}")
    print(f"PAN Number    : {block.tokens['pan_number']}")
    print(f"Date of Birth : {block.tokens['dob']}")
    print(f"Address       : {block.tokens['address']}")
    print(f"Verification Hash: {block.verification_hash}")

    save = input("enter y or n to save the file (y/n): ")
    if save.lower() == 'y':
        output_path = input("Entrer image filename (e.g., output.jpg): ")
        decode_image_from_base64(block.tokens["image_data"], output_path)
        print(f" Image saved to {output_path}")


def main():
    blockchain = Blockchain()

    while True:
        print("\n KYC Blockchain CLI Menu")
        print("1. Add KYC")
        print("2. View KYC by Username")
        print("3. Exit")

        choice = input("Select the option you want to choose ")

        if choice == '1':
            tokens, token = input_kyc()
            if tokens:
                blockchain.add_block(tokens, token)

        elif choice == '2':
            username = input("Enter their names to search: ")
            block = blockchain.get_kyc_by_username(username)
            if block:
                view_kyc(block)
            else:
                print("User not found.")

        elif choice == '3':
            print("Exiting...")
            break

        else:
            print("Invalid choice. Try again.")

if __name__ == "__main__":
    main()