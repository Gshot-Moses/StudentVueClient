import { defineStore } from 'pinia'
import axios from 'axios'

export const useStateStore = defineStore({
    id: 'appState',

    state: () => ({
        isLoading: false,
        error: "",
        currentUser: null,
        searchMode: false,
        students: [],
        searchResults: [],
        genders: ["Male", "Female"],
        isEditing: false,
        studentEdited: {
            _id: "",
            name: "",
            phoneNumber: "",
            age: "",
            class_: "",
            gender: "",
            password: ""
        },
    }),

    getters: {
        currentUserRole: (state) => {
            if (state.currentUser) {
                return state.currentUser.role
            }
            return null
        }
    },

    actions: {
        async authenticate(phone, password, callback) {
            try {
                this.error = ""
                this.isLoading = true
                const response = await axios.post(
                    'http://localhost:4000/signin', 
                    { 'phoneNumber': phone, password }
                )
                const data = response.data
                if (data['status'] === 'success') {
                    this.currentUser = data['user']
                    if (!this.currentUser.status) {
                        this.error = "Your account has been disabled."
                    } else {
                        callback()
                    }
                } else {
                    this.error = "Invalid credentials"
                }
            } catch(error) {
                console.log(error)
                this.error = "Authentication failed"
            } finally {
                this.isLoading = false
            }
        },

        async getStudents(callback) {
            try {
                this.isLoading = true
                this.error = ""
                const response = await axios.get('http://localhost:4000/students')
                const data = response.data
                if (data['status'] === 'success') {
                    this.students = data['students'].filter(item => item.role === 'Student')
                }
                this.error = ""
            } catch(error) {
                this.error = "We encountered an error while fetching the data. Please refresh the page"
            } finally {
                this.isLoading = false
                callback()
            }
        },

        async createStudent(callback) {
            try {
                this.isLoading = true
                this.error = ""
                const response = await axios.post(
                    'http://localhost:4000/student',
                    {
                        name: this.studentEdited.name,
                        phoneNumber: this.studentEdited.phoneNumber,
                        class: this.studentEdited.class_,
                        gender: this.studentEdited.gender,
                        age: this.studentEdited.age,
                        role: "Student",
                        password: this.studentEdited.password
                    }
                )
                const data = response.data
                if (data['status'] === 'success') {
                    this.studentEdited = {
                        _id: "",
                        name: "",
                        phoneNumber: "",
                        age: "",
                        class_: "",
                        gender: "",
                        password: ""
                    },
                    callback()
                }
            } catch (error) {
                this.error = "We encountered an error while registering the new student, retry please"
                console.log(error)
            } finally {
                this.isLoading = false
            }
        },

        async editStudent(callback) {
            try {
                this.isLoading = true
                const response = await axios.put(
                    'http://localhost:4000/student/' + this.studentEdited._id,
                    {
                        name: this.studentEdited.name,
                        phoneNumber: this.studentEdited.phoneNumber,
                        class: this.studentEdited.class_,
                        gender: this.studentEdited.gender,
                        age: this.studentEdited.age,
                        password: this.studentEdited.password
                    }
                )
                const data = response.data
                if (data['status'] === 'success') {
                    this.studentEdited = {
                        _id: "",
                        name: "",
                        phoneNumber: "",
                        age: "",
                        class_: "",
                        gender: "",
                        password: ""
                    },
                    this.isEditing = false
                    this.error = ""
                    callback()
                }
            } catch(error) {
                this.error = "We encountered an error while editing the student, retry please"
                console.log(error)
            } finally {
                this.isLoading = false
            }
        },

        async toggleStudentStatus(id, status) {
            try {
                const response = await axios.post(
                    'http://localhost:4000/student/toggle',
                    { id, 'status': !status}
                )
                const data = response.data
                if (data['status'] === 'success') {
                    const student = data['student']
                    if (this.searchMode) {
                        const item1 = this.searchResults.find(element => element._id === student._id)
                        const index1 = this.searchResults.indexOf(item1)
                        this.searchResults.splice(index1, 1)
                    }
                    const item = this.students.find(element => element._id === student._id)
                    const index = this.students.indexOf(item)
                    this.students.splice(index, 1)
                    this.students.splice(index, 0, student)
                }
            } catch(error) {
                console.log(error)
            } finally {

            }
        },

        async deleteStudent(id) {
            try {
                this.isLoading = true
                const response = await axios.delete(
                    'http://localhost:4000/student/' + id
                )
                const data = response.data
                if (data['status'] === 'success') {
                    if (this.searchMode) {
                        const index1 = this.searchResults.findIndex(item => item.id === id)
                        this.searchResults.splice(index1, 1)
                    }
                    const index = this.students.findIndex(item => item.id === id)
                    this.students.splice(index, 1)
                }
            } catch(error) {
                console.log(error)
            } finally {
                this.isLoading = false
            }
        },

        enterCreationMode(callback) {
            this.studentEdited = {
                _id: "",
                name: "",
                phoneNumber: "",
                class_: "",
                gender: "",
                password: ""
            },
            this.isEditing = false
            callback()
        },

        enterEditMode(student, callback) {
            this.studentEdited = {
                _id: student._id,
                name: student.name,
                phoneNumber: student.phoneNumber,
                age: student.age,
                class_: student.class,
                gender: student.gender,
                password: student.password
            },
            this.isEditing = true
            callback()
        },

        search(query) {
            if (query.trim().length !== 0) {
                this.searchMode = true
                this.searchResults = this.students.filter(i => 
                    i.name.toLowerCase().startsWith(query.toLowerCase())
                )
            }
        },

        exitSearchMode() {
            this.searchMode = false
            this.searchResults = []
        }
    }
})