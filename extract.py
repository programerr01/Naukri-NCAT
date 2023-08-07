"""
Extracting data into json  file
"""

import requests
import json 
import time 

FILE_PATH ="result.json"
BASE_URL="https://unstop.com/api/public/live-leaderboard/197198/quiz?page={}&per_page=100&undefined=true"
def main():
    last_page = 1;
    curr_page = 1;
    FINAL_DT = []
    while(curr_page <= last_page and curr_page <=30):
        res = requests.get(BASE_URL.format(str(curr_page)))
        res = res.json();
        print("On page ",curr_page);
        last_page = res['data']['last_page']
        FINAL_DT+=res['data']['data']
        time.sleep(1.2);
        curr_page+=1;
    print(len(FINAL_DT));
    sorted_data = sorted(FINAL_DT, key=lambda x: int(x['rank']))

    with open(FILE_PATH,'w') as json_file:
        json.dump(sorted_data,json_file,indent=2);

if __name__ == "__main__":
    main()
