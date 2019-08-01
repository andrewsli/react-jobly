import JoblyApi from "./JoblyApi";

describe("companies API", function () {
  it('gets a specific company', async function () {
    expect((await JoblyApi.getCompany("perez-miller"))).toEqual({
      "handle": "perez-miller",
      "name": "Perez-Miller",
      "num_employees": 298,
      "description": "Space one approach wife son. Themselves give necessary follow employee return feel. Step animal doctor sign water early.",
      "logo_url": "",
      "jobs": [
        {
          "id": 34,
          "title": "Orthoptist",
          "salary": 200000,
          "equity": 0.16
        },
        {
          "id": 57,
          "title": "Early years teacher",
          "salary": 55000,
          "equity": 0.07
        },
        {
          "id": 73,
          "title": "Art gallery manager",
          "salary": 73000,
          "equity": 0.06
        },
        {
          "id": 119,
          "title": "Aeronautical engineer",
          "salary": 156000,
          "equity": 0
        },
        {
          "id": 170,
          "title": "Psychologist, counselling",
          "salary": 180000,
          "equity": 0.17
        },
        {
          "id": 176,
          "title": "Medical physicist",
          "salary": 84000,
          "equity": 0.19
        }
      ]
    });
  })

  it('gets all companies', async function () {
    expect((await JoblyApi.getCompanies()).length).toEqual(50);
  })

  it('gets companies matching search terms', async function () {
    expect((await JoblyApi.getCompanies({ search: "Perez", min_employees: 100, max_employees: 400 }))).toEqual(
      [{
        "description": "Space one approach wife son. Themselves give necessary follow employee return feel. Step animal doctor sign water early.",
        "handle": "perez-miller",
        "logo_url": "",
        "name": "Perez-Miller"
      }]
    );
  })

  it('gets no companies when no company matches search term', async function () {
    expect((await JoblyApi.getCompanies({ search: "Perez", min_employees: 300, max_employees: 400 }))).toEqual(
      []
    );
  })

  it('should throw error when search terms are bad (when min_employees > max_employees)',
    async () => {
      await expect(JoblyApi.getCompanies({ search: "Perez", min_employees: 500, max_employees: 400 }))
        .rejects
        .toThrow("Min employees is larger than max employees");
    })

  it('should not create a company when not admin',
    async () => {
      await expect(JoblyApi.addCompany({
        handle: "cygames",
        name: "Cygames",
        num_employees: "5000",
        description: "evil gatcha company",
      }))
        .rejects
        .toEqual(["You must be an admin to access."])
    })

  // it('creates a company when admin',
  //   async () => {
  // })

  it('should not update a company when not admin',
    async () => {
      await expect(JoblyApi.updateCompany("cygames", {
        handle: "cygames",
        name: "Cygames",
        num_employees: "5000",
        description: "evil but not so evil gatcha company",
      }))
        .rejects
        .toEqual(["You must be an admin to access."])
    })

  // it('should update a company when admin',
  // async () => {
  // })

  it('should not delete a company when not admin',
    async () => {
      await expect(JoblyApi.deleteCompany("cygames"))
        .rejects
        .toEqual(["You must be an admin to access."])
    })

  // it('should delete a company when admin',
  // async () => {
  // })
});

describe("Jobs API", function () {
  it('gets a specific job', async function () {
    expect((await JoblyApi.getJob(11))).toEqual({
      "id": 11,
      "title": "Best boy",
      "salary": 193000,
      "equity": 0.06,
      "company_handle": "jackson-and-sons",
      "company": {
        "name": "Jackson and Sons",
        "num_employees": 649,
        "description": "President couple political sit create.",
        "logo_url": ""
      }
    });
  })

  it('gets all jobs', async function () {
    expect((await JoblyApi.getJobs()).length).toEqual(200);
  })

  it("should get all matching jobs with search terms", async function () {
    expect((await JoblyApi.getJobs({ search: "Best boy", min_salary: 100000, min_equity: 0.04 }))).toEqual(
      [{
        "company_handle": "jackson-and-sons",
        "equity": 0.06,
        "id": 11,
        "salary": 193000,
        "state": null,
        "title": "Best boy",
      }]
    );
  })

  it("should no matching jobs with non-matching search terms", async function () {
    expect((await JoblyApi.getJobs({ search: "0.1x Engineer", min_salary: 200000, min_equity: 0.1 }))).toEqual(
      []
    );
  })

  it('should not create a job when not admin',
    async () => {
      await expect(JoblyApi.addJob({
        company_handle: "cygames",
        equity: 0,
        salary: 1000,
        title: "evil mastermind",
      }))
        .rejects
        .toEqual(["You must be an admin to access."])
    })

  // it('creates a job when admin',
  //   async () => {
  // })

  it('should not update a job when not admin',
    async () => {
      await expect(JoblyApi.updateJob(11, {
        company_handle: "cygames",
        equity: 0,
        salary: 1000,
        title: "evil mastermind",
      }))
        .rejects
        .toEqual(["You must be an admin to access."])
    })

  // it('should update a job when admin',
  // async () => {
  // })

  it('should not delete a job when not admin',
    async () => {
      await expect(JoblyApi.deleteJob(11))
        .rejects
        .toEqual(["You must be an admin to access."])
    })

  // it('should delete a job when admin',
  // async () => {
  // })
});

describe("Users API", function () {
  it('gets a specific user when logged in', async function () {
    expect((await JoblyApi.getUser("testuser"))).toEqual(
      {
        "username": "testuser",
        "first_name": "Joel",
        "last_name": "Burton",
        "email": "joel@joelburton.com",
        "photo_url": null,
        "jobs": []
      }
    );
  })

  it('gets all users', async function () {
    expect((await JoblyApi.getUsers()).length).toEqual(1);
  })

  it('registers a user when given all required info',
    async function () {
      expect((await JoblyApi.addUser({
        username: "number",
        password: "1234567890",
        first_name: "Num",
        last_name: "Ber"
      }))).toEqual(expect.any(String));
    })

  it('should not register a user when not given all required info',
    async () => {
      await expect(JoblyApi.addUser({
        username: "nopw"
      }))
        .rejects
        .toEqual(["instance requires property \"password\""])
    })

  it('should update a user if they are the user',
    async function () {
      expect(await JoblyApi.updateUser("testuser", {
        email: "123@456.com"
      })).toEqual({
        "username": "testuser",
        "first_name": "Joel",
        "last_name": "Burton",
        "email": "123@456.com",
        "photo_url": null
      })
    })

  it('should not update a user if they are not the user',
    async () => {
      await expect(JoblyApi.updateUser("number", {
        email: "number@numbers.com"
      }))
        .rejects
        .toEqual(["You are not authorized."])
    })


  // it('should not delete a user when they are the user',
  //   async () => {
  //     await expect(JoblyApi.deleteUser(""))
  //       .rejects
  //       .toEqual(["You must be an admin to access."])
  //   })

  it('should not delete a user when they are not the user',
    async () => {
      await expect(JoblyApi.deleteUser("number"))
        .rejects
        .toEqual(["You are not authorized."])
    })
});

describe("Auth API", function () {
  it("logs in properly when given the right info", async function () {
    expect((await JoblyApi.logIn({
      username: "testuser",
      password: "secret"
    }))).toEqual(expect.any(String));
  })

  it("does not log in when not given the right info", async () => {
    await expect(JoblyApi.logIn({
      username: "testuser",
      password: "testuser"
    }))
      .rejects
      .toEqual(["Invalid Credentials"])
  });
})