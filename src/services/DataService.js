import { BehaviorSubject } from "rxjs";

/**
 * @description Class representing a data service
 *  for fetching and storing data.
 */
class DataService {
  constructor() {
    this.data = new BehaviorSubject([]);
  }
  
  /**
   * @description Get the data from db.
   * @param query
   */
  getDataFromServer(query = "") {
    const url = query
      ? "https://my-json-server.typicode.com/angela0202/db/users?" + query
      : "https://my-json-server.typicode.com/angela0202/db/users";
    fetch(url)
      .then(res => res.json())
      .then(data => this.data.next(data || []));
  }
  
  /**
   * @description Getter for the fetched data
   */
  get fetchedData() {
    return this.data;
  }
}

export default new DataService();
