import os
from dotenv import load_dotenv
from flask import Flask, redirect, render_template, session, request, flash, url_for
load_dotenv()
app = Flask(__name__)
# Set SECRET_KEY on Render. The fallback is only for running on your own computer.
app.secret_key = os.getenv("SECRET_KEY")


def login_required(view):
    """Only someone who answered correctly can open the story and the letter."""
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not session.get("hope"):
            return redirect(url_for("login"))
        return view(*args, **kwargs)
    return wrapped


@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("MyHope.html")

    # strip() and casefold() so " divine " and "DIVINE" also work
    if request.form.get("name", "").strip().casefold() != "divine":
        flash(" Oops! That's not quite right. Try again ❤️")
        return redirect(url_for("login"))
    session["hope"] = True
    return redirect(url_for("loveStory"))


@app.route("/ourLoveStory")
@login_required
def loveStory():
    return render_template("story.html")


@app.route("/letter")
@login_required
def letter():
    return render_template("letter.html")


if __name__ == "__main__":
    app.run(debug=os.environ.get("FLASK_DEBUG") == "1")
