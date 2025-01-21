from flask import Flask, request, jsonify
import cohere

app = Flask(__name__)

# Initialize Cohere API client
co = cohere.Client('OnD09HcVqPIcTdtQ2Ux42SYLiS7vApX80joGVDdl')

@app.route("/chat", methods=["POST"])
def chat():
    # Get the user input from the request
    user_input = request.json.get("user_input")
    
    # Send the user input to Cohere's NLP model to generate a response
    response = co.generate(
        model='xlarge',
        prompt=f"The user asked about water conservation: {user_input}",
        max_tokens=100
    )

    # Send the response back to the frontend
    return jsonify({"response": response.text})

if __name__ == "__main__":
    app.run(debug=True)
