from flask import Flask, request, jsonify
from keyGen import keyGen
import onetimepad
from selenium import webdriver
import os
import time
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})


@app.route("/")
def welcome():
    return "Hello world"

# @app.route('/skill_rack_data',methods=["POST"])


@app.route("/verify_credentials", methods=["POST"])
def makeKeyGen():
    username = request.json['username']
    password = request.json['password']

    try:
        userCreds = {}
        userCreds["username"] = username
        key = keyGen()
        cipher = onetimepad.encrypt(password, key)
        userCreds["Cipher"] = cipher
    except Exception as error:
        print(error)

    return jsonify(userCreds)


@app.route("/skillrack_scrapper", methods=["POST"])
def scrape_skillrack():
    username = request.json['username']
    password = request.json['password']
    print(username, password)

    Stats = {}
    url = "https://skillrack.com/faces/ui/profile.xhtml"
    options = webdriver.ChromeOptions()
    options.headless = True
    driver = webdriver.Chrome(
        r"C:\\programming\\ic_hackz\\backend\\chromedriver.exe", options=options)
    driver.get(url)
    driver.find_element_by_name("j_username").send_keys(username)
    driver.find_element_by_name("j_password").send_keys(password)

    driver.find_element_by_xpath("//input[@type='submit']").click()
    print("Login successfull")

    medals = driver.find_element_by_xpath(
        "//table[@id='j_id_14:j_id_1c']/tbody/tr[1]/td[5]").text
    medals = medals
    os.system("cls")
    print(f"The student has : {medals}")
    Stats["skillrack_medals_count"] = medals

    driver.get("https://skillrack.com/faces/candidate/manageprofile.xhtml")

    driver.find_element_by_id("j_id_3e:j_id_3h").send_keys(password)
    driver.find_element_by_xpath("//button[@type='submit']").click()
    btn = driver.find_element_by_xpath("//div[@id='j_id_3l']").text.split()
    driver.get(btn[7])

    stats = driver.find_element_by_xpath(
        "//div[@class='ui six small statistics'][2]").text
    stats = stats.split()
    skills = {}
    for i in range(1, len(stats), 2):
        skills[stats[i]] = stats[i-1]

    os.system("cls")
    print(f"The student has : {medals}")
    print("The student has the following skills : ", skills, sep="\n")
    Stats["skills"] = skills
    return jsonify(Stats)


@app.route("/hacker_rank_scrapper", methods=["POST"])
def scrape_hackerrank():
    url = "https://www.hackerrank.com/auth/login"
    username = request.json['username']
    password = request.json['password']
    options = webdriver.ChromeOptions()
    options.add_argument("--window-size=1366,768")
    options.add_argument("--disable-extensions")
    options.add_argument("--proxy-server='direct://'")
    options.add_argument("--proxy-bypass-list=*")
    options.add_argument("--start-maximized")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--no-sandbox")
    options.add_argument("--ignore-certificate-errors")
    driver = webdriver.Chrome(
        r"C:\\programming\\ic_hackz\\backend\\chromedriver.exe", options=options)
    driver.get(url)
    driver.implicitly_wait(5)
    driver.find_element_by_name("username").send_keys(username)
    driver.find_element_by_name("password").send_keys(password)
    driver.find_element_by_xpath("//button[@type='submit']").click()
    os.system("cls")
    print("Login successfull")
    time.sleep(5)
    count_course = 0
    course_name = []
    try:
        for i in range(1, 10):
            content = driver.find_element_by_id(f"base-card-{i}").text
            course_name.append(content)
            count_course += 1
    except:
        pass
    percent = []
    percentage = driver.find_elements_by_xpath(f"//span[@class='percentage']")
    for i in percentage:
        percent.append(i.text)

    scraped = {}
    for i in range(count_course):
        scraped[course_name[i]] = percent[i]

    os.system("cls")

    print("The use has the following data here : ", scraped, end="\n")
    return jsonify(scraped)


if __name__ == '__main__':
    app.run()
