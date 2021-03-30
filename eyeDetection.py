import numpy as np

import cv2

# faceCascade = cv2.CascadeClassfier('Cascades/haarcascade_frontalface_default.xml')

eyeCascade = cv2.CascadeClassifier('/home/pi/opencv_test/haarcascades/haarcascascade_eye.xml')

cap = cv2.VideoCapture(0)

cap.set(3, 640) # set Width

cap.set(4, 480) # set Height

 
while true:

        ret, img = cap.read()

        img = cv2.flip(img, 1)

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        faces = faceCascade.detectMultiScale(

                gray,

                scaleFactor=1.3,

                minNeighbors=5,

                minSize=(30, 30)