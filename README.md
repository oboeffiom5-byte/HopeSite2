# For Hope

Run: `pip install -r requirements.txt`, then `python app.py`, open http://127.0.0.1:5000
Answer to the question on the first page: Divine (any capitals, extra spaces are fine).

Add your song as `static/music/our-song.mp3`.
Add your photos in `static/images/` with these names: our_date.jpg, together.jpg, memory1.jpg,
memory2.jpg, favourite_moment.jpg (until then you see pink "Add ..." frames).
hope1.jpg to hope7.jpg are already there.

Render: build `pip install -r requirements.txt`, start `gunicorn app:app`, set env var SECRET_KEY to a long random text.
