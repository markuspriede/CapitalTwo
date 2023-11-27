'''
Contains blokclist of JWT tokens. It will be imported by the app and
logout resources so that token can be added to blocklist when user logs out.
'''

BLOCKLIST = set()