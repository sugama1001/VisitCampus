from flask import Flask, jsonify, request
import tensorflow as tf
import numpy as np
import tensorflow_text as text
import tensorflow_hub
import joblib
from transformers import pipeline
from deep_translator import GoogleTranslator
import random
import json


label_encoder = joblib.load('label_encoder.joblib')
model_tanya = tf.keras.models.load_model('revisi_model_5w1h1g')
model_univ = tf.keras.models.load_model('university_classification_model')
label_univ_encoder = joblib.load('university_encoder.joblib')
qa = pipeline('question-answering')
reply_list = ['Halo', 'Selamat Datang', 'Hai Teman']

# ubah path sesuai dengan model machine learning Scope Of Science yang digunakan
model_sos_path = "model_recommendation"

try:
    # Use experimental_io_device option
    model = tf.keras.models.load_model(model_sos_path)
    print("Model loaded successfully.")
except Exception as e:
    print("Error loading the model:", str(e))
def gabung_probabilitas(arrays):
    soshum = sum(arrays[0])
    saintek = sum(arrays[1])
    soshum_percentage = round(soshum / (soshum + saintek), 2)

    return {"soshum": soshum_percentage, "saintek": 1 - soshum_percentage}
def pembobotan_elemen_MBTI(model_output_value, bobot):
    for index_data in range(len(model_output_value)):
        for num in range(2):
            bobot[index_data][num] = round(model_output_value[index_data] * bobot[index_data][num][num], 2)

    output_list = [[], []]

    for bobot_list in bobot:
        output_list[0].append(bobot_list[0])
        output_list[1].append(bobot_list[1])

    return output_list
def translate_text(text, language, target_language):
    return GoogleTranslator(source=language, target=target_language).translate(text=text)
def get_personality_by_name(unive_name, json_university):
    for uni in json_university:
        if uni["univ_name"].lower() == unive_name.lower():
            return uni["personality_univ"]
    return None
def filter_model(input):
    # get text class from questions classification model
    prediction_tanya = model_tanya.predict([input])
    predicted_class_index = tf.argmax(prediction_tanya, axis=1).numpy()[0]
    predicted_class_name = label_encoder.classes_[predicted_class_index]

    if predicted_class_name == 'sapaan':
        selected_reply = random.choice(reply_list)
        return selected_reply
    else:
        # get univ_name from text classification model
        prediksi_univ = model_univ.predict([input])
        predicted_class_univ_index = tf.argmax(prediksi_univ, axis=1).numpy()[0]
        predicted_class_univ_name = label_univ_encoder.classes_[predicted_class_univ_index]

        # ini harusnya API dari CC tapi sementara pakai file json static dulu
        with open('database.json', 'r', encoding='utf-8') as file:
            data_univ = json.load(file)

        # get university description based on question
        context = get_personality_by_name(predicted_class_univ_name, data_univ)
        if context is not None:
            question = input[0]
            context = translate_text(context, 'id', 'en')
            question = translate_text(question, 'id', 'en')
            answer = qa(context=context, question=question)['answer']
            answer = translate_text(answer, 'en', 'id')

            return answer
        else:
            return "Informasi Pertanyaan kamu di visitcampus belum ada nih, kami berusaha untuk memperbarui :("


app = Flask(__name__)

@app.route("/")
def index():
    return "<h1>The API WORK</h1>"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Validasi input data
        for key in ['EI_text', 'SN_text', 'TF_text', 'JP_text']:
            if not isinstance(data[key], str) or not data[key]:
                return jsonify({"error": f"Teks input tidak boleh kosong"}), 400

        EI_text = np.array([data['EI_text']])
        SN_text = np.array([data['SN_text']])
        TF_text = np.array([data['TF_text']])
        JP_text = np.array([data['JP_text']])

        arrays = [EI_text, SN_text, TF_text, JP_text]

        predictions = model.predict(arrays)

        bobot = [
            [[0.875, 0.125], [0.75, 0.25]],
            [[0.67, 0.33], [0.5, 0.5]],
            [[0.75, 0.25], [0.71, 0.29]],
            [[0.625, 0.375], [0.79, 0.21]]
        ]

        json_predictions = [float(prediction[0]) for prediction in predictions]
        json_predictions = pembobotan_elemen_MBTI(json_predictions, bobot)
        json_predictions = gabung_probabilitas(json_predictions)

        return jsonify(json_predictions)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    user_input = data.get('question')
    input_data = [user_input]
    answer = filter_model(input_data)
    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(debug=True)
