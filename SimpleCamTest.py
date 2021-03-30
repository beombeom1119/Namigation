import numpy as np

import cv2

cap = cv2.VideoCapture(0)

cap.set(3,800) # Set Width

cap.set(4,600) # Set Height

While(True):

ret, frame = cap.read()

frame = cv2.flip(frame, 1) # Flip Camera vertically

# gray - cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

cv2.imshow('frame', frame)

# cv2.imshow('gray', gray)

k = cv2.waitKey(1) & 0xff

if k == 27: #press 'ESC' to quit

break

cap.release()

cv2.destroyAllWindows