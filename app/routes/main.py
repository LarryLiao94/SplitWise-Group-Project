from flask import (Blueprint, render_template, redirect, url_for)


main_bp = Blueprint("main", __name__)


@main_bp.route('/')
def main():
    return render_template("main.html")
